import { useState, useEffect } from "react";
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
const Error = styled.div`
  margin-top: -30px;
  margin-bottom: 10px;
  text-align: center;
  color: red;
  font-weight: 700;
`;

export default function EditArticle({ post }) {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const [markdown, setMarkdown] = useState(post.markdown);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    let file = e.target.files;

    if (file.length) {
      setPhoto(file[0]);
    } else {
      setPhoto(null);
    }
  };

  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("markdown", markdown);
    fd.append("image", photo);
    fd.append("category", category);

    const res = await fetch(`/api/posts/update/${post.slug}`, {
      method: "PATCH",
      body: fd,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <Wrapper>
      <h2>Edit Article</h2>

      {error && <Error>{error}</Error>}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="image">
          <div>
            {(photo && (
              <Image
                src={window.URL.createObjectURL(photo)}
                alt={photo.name}
                width={300}
                height={170}
              />
            )) || (
              <Image
                src={`/api/posts/${post._id}/image/`}
                alt={post.title}
                width={300}
                height={170}
              />
            )}
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
          <input
            type="text"
            value={title}
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="desc">
          Description
          <textarea
            id="desc"
            cols="30"
            rows="3"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        <label htmlFor="markdown">
          Markdown{" "}
          <textarea
            id="markdown"
            cols="60"
            rows="10"
            value={markdown}
            required
            onChange={(e) => setMarkdown(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="select">
          Category :{" "}
          <select
            id="select"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </Form>
    </Wrapper>
  );
}
