import React from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import {
  ADD_AUTHOR_LABEL,
  CANCEL_CREATE_COURSE_LABEL,
  CREATE_AUTHOR_LABEL,
  CREATE_COURSE_LABEL,
} from "../../utils/constants";

export const CreateCourse = ({ setShowAddCourseView, authors }) => {
  return (
    <div className="add-course-container">
      <div className="add-title-section">
        <div className="add-title">
          <h3>Title: </h3>
          <Input
            placeholder="Add title here..."
            name="title"
            className="add-input"
            onChange={() => {}}
          ></Input>
        </div>
        <div className="add-button">
          <Button
            buttonText={CREATE_COURSE_LABEL}
            onClick={() => {
              setShowAddCourseView(false);
            }}
            className="add-button-container"
          ></Button>
          <Button
            buttonText={CANCEL_CREATE_COURSE_LABEL}
            onClick={() => {
              setShowAddCourseView(false);
            }}
            className="add-button-container"
          ></Button>
        </div>
      </div>
      <div className="add-description-section">
        <h3>Description: </h3>
        <textarea id="story" name="story" rows="5" cols="50"></textarea>
      </div>
      <div className="add-authors-section">
        <div className="authors-duration-section">
          <div className="author-creation-section">
            <h2>Add Author</h2>
            <h3>Author name: </h3>
            <Input
              placeholder="Enter author here..."
              name="author"
              className="add-author"
              onChange={() => {}}
            ></Input>
            <Button
              onClick={() => {}}
              buttonText={CREATE_AUTHOR_LABEL}
              className="add-author-button"
            ></Button>
          </div>
          <div className="duration-creation-section">
            <h3>Duration: </h3>
            <Input
              placeholder="Enter duration in minutes..."
              name="duration"
              className="add-duration"
              onChange={() => {}}
            ></Input>
            <h1>00:00</h1>
          </div>
        </div>
        <div className="add-existing-author-section">
          <div>
            {authors.map((author) => {
              return (
                <div className="add-existing-author">
                  <h3>{author.name}</h3>
                  <Button
                    className="add-author"
                    onClick={() => {}}
                    buttonText={ADD_AUTHOR_LABEL}
                  ></Button>
                </div>
              );
            })}
          </div>
          <div className="author-list-section">
            <h3>Course Authors</h3>
            <span>Author list is empty</span>
          </div>
        </div>
      </div>
    </div>
  );
};
