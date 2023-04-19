import React from 'react';
import AddReviewForm, { ReviewFormValues } from '@/components/reviews/AddReviewForm';
import { useCreateReview } from '@/services/reviews/createReview';
import { useRouter } from 'next/router';

const AddReview = () => {
    const [createReview] = useCreateReview();
    const router = useRouter();

    const handleSubmit = (values: ReviewFormValues) => {
        createReview(values);
        router.push("/reviews/thanks")
    }

    return (
        <div className="flex justify-center items-center m-auto my-10 w-4/12">
            <AddReviewForm onSubmit={handleSubmit} />
        </div>
    )
}

export default AddReview