import React from 'react'

const SubjectCard = (props) => {

    const {imgUrl, title, lesson, students, rating,}= props.item

  return <div className="single_subject_item">
  <div className="subject_img">
      <img src={imgUrl} alt="subject1" className="w-100"/>
  </div>

  <div className="subject_details">
      <h5 className="subject_title mb-4">
          {title}
      </h5>
      
      <div className="d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
          <i class="ri-gamepad-line"></i>
          {lesson} Games Available
          </p>

          <p className="students d-flex align-items-center gap-1">
          <i class="ri-user-line"></i>
          {students} Users Played
          </p>
      </div>

      <div className="d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
          <i class="ri-star-fill"></i>
          {rating}
          </p>

          <p className="enroll d-flex align-items-center gap-1">
          <i class="ri-user-line"></i>
              <a href="#"> Play Now!</a>
          </p>
      </div>
  </div>
</div>
};

export default SubjectCard;