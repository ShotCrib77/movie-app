import StarRating from "../general/StarRating";

export default function MovieAssessment() {
  return ( 
    <div>
      <StarRating isReadOnly={false} starSize="large" precision={0.5} starRating={0} />
    </div>
  )
}