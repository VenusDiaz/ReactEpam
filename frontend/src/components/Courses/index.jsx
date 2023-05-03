import React from "react";
import "./index.css";
import { CourseCard } from "./CourseCard";
import { SearchBar } from "./SearchBar";
import { mockedCoursesList } from "../../backend/courseList";

export const Courses = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      {mockedCoursesList.map((course) => {
        return (
          <CourseCard
            title={course.title}
            duration={course.duration}
            description={course.description}
            created={course.creationDate}
            key={course.id}
          ></CourseCard>
        );
      })}
    </div>
  );
};
