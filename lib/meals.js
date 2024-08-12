import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs' //API from nodeJS to read files and store in memory

const db = sql('meals.db');

export async function getMeals(){
   await new Promise((resolve) => setTimeout(resolve, 5000)); // 
//    throw  new Error('Failed to fetch meals');  // To Simulate an Error
   return db.prepare('SELECT * FROM meals').all();       // Here all is used to fetch all the rows from the table 
}
 
export  function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);       // Here all is used to fetch all the rows from the table
}

export async function saveMeal(meal){
     meal.slug = slugify(meal.title, {lower: true});
     meal.instructions = xss(meal.instructions);

     // Image Upload
     const extension = meal.image.name.split('.').pop();
     const fileName = `${meal.slug}.${extension}`;
     const stream = fs.createWriteStream('public/images/' + fileName);
     const bufferedImage = await meal.image.arrayBuffer();                 // returns a promise therefore we use await
   // the write function takes in 2 arguments, the first one is the buffer and the second one is the function to be called when the write is complete
     stream.write(Buffer.from(bufferedImage), (error) => {
         if(error){
            throw new Error('Saving image failed');
         }
     });
     meal.image = `/images/${fileName}`;

     db.prepare(`
         INSERT INTO meals (
            title,
            summary,
            instructions,
            creator,
            creator_email,
            image,
            slug
         ) VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
         )`
     ).run(meal);       // Make sure to pass the values in the same order as the columns in the table
                        // Use placeholders to prevent sql injection
}