import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl";

import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import CommentForm from "./comments/commentForm";
import CommentList from "./comments/commentList";
import { usePost } from "../contexts/PostContext";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const PostContainer = styled.div`
  position: relative;
  width: 95%;
  max-width: 55rem;
  padding: 1rem;
  margin: 2rem auto;
  line-height: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);

  @media (min-width: 600px) {
    font-size: 1.25rem;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
`;
const Title = styled.h1`
  font-size: 3rem;
  line-height: 1;
  margin: 0;
  text-align: center;

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;
const CategoryLabel = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 10px 0 0;
  background-color: black;
  border: 1px solid black;
  padding: 3px 10px;
  color: white;

  @media (min-width: 600px) {
    font-size: 1.2rem;
    border-radius: 0;
  }
`;

const ImageHedaer = styled.div`
  background-color: gray;
  border-radius: 0.25rem;
  width: 100%;
  margin-bottom: 10px;
  & img {
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

const ImageContainer = styled.div`
  background-color: gray;
  border-radius: 0.25rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 600px;

   {img} {
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

const DateContainer = styled.time`
  font-size: 16px;
`;

const About = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(243, 244, 246, 0.9);
  padding: 10px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;

  & img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
  }
  & h4 {
    margin: 0px;
    margin-left: 5px;
    font-size: 16px;
  }
`;

const Content = styled.div`
  & a {
    color: orange;
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

export default function PostDetails({ post }) {
  const {
    title,
    _id: postId,
    author,
    category,
    slug,
    markdown,
    imgSrc,
    date_uploaded,
  } = post;

  const { rootComments, loading, error, onCreateComment } = usePost();

  const formatedDate = new Date(date_uploaded).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const customRenderer = {
    code: ({ language, children }) => {
      return (
        <SyntaxHighlighter style={nightOwl} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
    p: ({ node, children }) => {
      if (node.children[0].tagName === "img") {
        const img = node.children[0];
        return (
          <ImageContainer>
            <Image
              src={`/images/posts/${slug}/${img.properties.src}`}
              alt={img.properties.alt}
              width={600}
              height={400}
              layout="responsive"
            />
          </ImageContainer>
        );
      }

      return <p>{children}</p>;
    },
    a: ({ node, children, ...props }) => {
      return (
        <a {...props} target="_blank">
          {children}
        </a>
      );
    },
  };

  const router = useRouter();

  return (
    <PostContainer>
      <CategoryLabel>{category}</CategoryLabel>
      <Header>
        <Title>{title}</Title>
      </Header>

      <ImageHedaer>
        <Image
          src={imgSrc}
          alt={title}
          width={600}
          height={250}
          layout="responsive"
        />
      </ImageHedaer>

      <About>
        <Author>
          {/* <Image src={author_image} alt={author} width={30} height={30} /> */}

          <h4>
            {author.firstName} {author.lastName}
          </h4>
        </Author>
        <DateContainer> {formatedDate}</DateContainer>
      </About>

      <Content>
        <ReactMarkdown components={customRenderer}>{markdown}</ReactMarkdown>
      </Content>

      <ButtonWrapper>
        <Btn onClick={() => router.back()}>Go Back</Btn>
      </ButtonWrapper>

      <div>
        <h3>Comments</h3>
        <section>
          <CommentForm
            loading={loading}
            error={error}
            onSendComment={onCreateComment}
          />

          {rootComments !== null && rootComments?.length > 0 && (
            <Container>
              <CommentList comments={rootComments} />
            </Container>
          )}
        </section>
      </div>
    </PostContainer>
  );
}
