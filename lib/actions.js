'use server';

import { saveMeal } from './meals';
import { redirect } from 'next/navigation';
export async function shareMeal(formData) {

  console.log(formData);
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      image: formData.get('image'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    };
    await saveMeal(meal);
    redirect('/meals');

}