import { useState, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Btn } from ".";
import Image from "next/image";

const Wrapper = styled.div`
  margin: 0 auto;

  & > h2 {
    text-align: center;
    font-size: 2.25rem;
  }
`;
const Form = styled.form`
  max-width: 900px;

  & label {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    width: 100%;

    & select {
      padding: 5px 20px;
      border: none;
      outline: 1px solid #0f2648;
    }
  }

  & label:first-child {
    width: 300px;
    height: 170px;

    & div {
      width: 300px;
      height: 170px;
      outline: 2px dashed #ddd;
      margin: 0 auto;
    }

    & input {
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
    }

    & input:is(:focus, :focus-within) + label {
      outline: thin dotted;
    }
  }

  & input {
    display: block;
    width: 100%;
    margin-top: 5px;
    padding: 8px 10px;
    border: none;
    outline: 1px solid #0f2648;
  }
  & #desc {
    display: block;
    margin-top: 5px;
    padding: 8px 10px;
    width: 100%;
    border: none;
    outline: 1px solid #0f2648;
  }

  & #markdown {
    display: block;
    margin-top: 5px;
    background-color: #0f2648;
    color: white;
    width: 100%;
    padding: 20px 30px;
    font-size: 1rem;
  }
`;
const Button = styled(Btn)`
  font-size: 1rem;
  background-color: ${(c) => c.theme.colors.ui.secondary};
  margin-right: 10px;
  display: inline-block;
`;
const CancelBtn = styled(Button)`
  background-color: grey;
  margin-right: 10px;
  font-size: 1rem;
`;

export default function NewArticle() {
  const [photo, setPhoto] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const markdownRef = useRef();
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    let file = e.target.files;

    if (file.length) {
      setPhoto(file[0]);
    } else {
      setPhoto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", titleRef.current.value);
    fd.append("description", descriptionRef.current.value);
    fd.append("markdown", markdownRef.current.value);
    fd.append("image", photo);
    fd.append("category", categoryRef.current.value);

    const res = await fetch("/api/posts/new", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
  };

  return (
    <Wrapper>
      <h2>New Article</h2>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="image">
          <div>
            {photo && (
              <Image
                src={window.URL.createObjectURL(photo)}
                alt={photo.name}
                width={300}
                height={170}
              />
            )}
          </div>
          <input
            required
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>

        <label htmlFor="title">
          Title
          <input type="text" placeholder="Title" required ref={titleRef} />
        </label>

        <label htmlFor="desc">
          Description
          <textarea
            id="desc"
            cols="30"
            rows="3"
            placeholder="Description"
            required
            ref={descriptionRef}
          ></textarea>
        </label>

        <label htmlFor="markdown">
          Markdown{" "}
          <textarea
            id="markdown"
            cols="60"
            rows="10"
            required
            ref={markdownRef}
          ></textarea>
        </label>

        <label htmlFor="select">
          Category :{" "}
          <select id="select" ref={categoryRef}>
            <option value="" disabled>
              None
            </option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Javascript">JAVASCRIPT</option>
            <option value="React">REACT</option>
            <option value="Node.js">NODEJS</option>
            <option value="Express">EXPRESSJS</option>
            <option value="Mongoose">MONGOOSE</option>
            <option value="MongoDB">MONGODB</option>
            <option value="MySQL">MYSQL</option>
            <option value="Python">PYTHON</option>
          </select>
        </label>

        <Link href="/admin/articles">
          <a>
            <CancelBtn>Cancel</CancelBtn>
          </a>
        </Link>

        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
}
