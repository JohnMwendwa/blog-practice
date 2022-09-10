import React from "react";
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
`;
const Title = styled.h1`
  text-align: center;
`;
const Content = styled.div``;

export default function PostDetails({ post }) {
  const { title, content } = post;

  return (
    <PostContainer>
      <Title>{title}</Title>
      <Content>
        <ReactMarkdown components={customRenderer}>{content}</ReactMarkdown>
      </Content>
    </PostContainer>
  );
}
