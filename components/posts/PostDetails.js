import React from "react";
import Image from "next/image";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const customRenderer = {
  code: ({ language, children }) => {
    return (
      <SyntaxHighlighter style={coldarkDark} language={language}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

const PostContainer = styled.div`
  width: 95%;
  max-width: 60rem;
  padding: 1rem;
  margin: 2rem auto;
  line-height: 2rem;
  font-size: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
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
`;
const CategoryLabel = styled.button`
  align-self: center;
  border-radius: 5px;
  background-color: black;
  border: 1px solid black;
  padding: 3px 10px;
  font-size: 1.2rem;
  color: white;
`;

const DateContainer = styled.div``;

const ImageContainer = styled.div`
  background-color: gray;
  border-radius: 0.25rem;
  margin-bottom: 10px;
  & img {
    object-fit: cover;
    max-width: 100%;
    border-radius: 0.25rem;
  }
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
  }
`;

const Content = styled.div``;

export default function PostDetails({ post }) {
  const { title, image, author, author_image, date, category, content } = post;

  const formatedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PostContainer>
      <Header>
        <Title>{title}</Title>
        <CategoryLabel>{category}</CategoryLabel>
      </Header>

      <ImageContainer>
        <Image
          src={image}
          alt={author}
          width={200}
          height={150}
          layout="responsive"
        />
      </ImageContainer>

      <About>
        <Author>
          <Image src={author_image} alt={author} width={30} height={30} />

          <h4>{author}</h4>
        </Author>
        <DateContainer>Posted on {formatedDate}</DateContainer>
      </About>

      <Content>
        <ReactMarkdown components={customRenderer}>{content}</ReactMarkdown>
      </Content>
    </PostContainer>
  );
}
