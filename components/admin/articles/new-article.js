import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Btn } from ".";

const Wrapper = styled.div`
  margin: 0 auto;
`;
const Form = styled.form`
  max-width: 900px;

  & label {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    width: 100%;
  }

  & label:first-child {
    & div {
      display: flex;
      justify-content: center;
      align-items: center;
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
`;
const CancelBtn = styled(Button)`
  background-color: grey;
  margin-right: 10px;
  font-size: 1rem;
`;

export default function NewArticle() {
  const [photo, setPhoto] = useState(null);

  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files;

    if (file.length) {
      let imgSrc = URL.createObjectURL(file[0]);

      if (window.onload) {
        console.log("reloaded");
        URL.revokeObjectURL(imgSrc);
      }

      console.log(imgSrc);
      setPhoto(imgSrc);

      const fd = new FormData();
      fd.append("image", file[0], file[0].name);

      console.log(fd);
    } else {
      setPhoto(null);
    }
  };

  return (
    <Wrapper>
      <h2>New Article</h2>

      <Form>
        <label htmlFor="image">
          <div>
            {photo && <img src={photo} alt="me" width={300} height={170} />}
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
        <label htmlFor="title">
          Title
          <input type="text" placeholder="Title" />
        </label>
        <label htmlFor="desc">
          Description
          <textarea
            id="desc"
            cols="30"
            rows="3"
            placeholder="Description"
          ></textarea>
        </label>
        <label htmlFor="markdown">
          Markdown <textarea id="markdown" cols="60" rows="10"></textarea>
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
