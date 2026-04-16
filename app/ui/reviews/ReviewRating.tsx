export default function ReviewRating({ rating, count }: { rating: number, count?: number }) {
    const fullStar = "★";
    const halfStar = "★"; // Change icon to represent half star if needed "⯨"
    const emptyStar = "☆";

    const getStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 <= 0.5 && rating % 1 > 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return fullStar.repeat(fullStars) + halfStar.repeat(halfStars) + emptyStar.repeat(emptyStars);
    };

    return (
        <div className="font-bold text-[#FCB33D]">
            <span className="ml-1 font-normal text-black">{rating} </span>
            <span className="text-xl">{getStars(rating)}</span>
            {count !== undefined && <span className="ml-1 font-normal text-primary">({count})</span>}
        </div>
    );
}
