import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Card = styled.div`
  margin: 20px;
  max-width: 450px;
  min-width: 300px;
  height: auto;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 13rem;
  background-color: grey;
  margin: 0 auto;
  overflow: hidden;
`;
const Img = styled(Image)`
  object-fit: fill;
  border-radius: 5px;
`;

const Avatar = styled(Image)`
  background-color: grey;
  border-radius: 50%;
`;
const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: grey;
`;
const Time = styled.time`
  color: white;
`;
const CategoryLabel = styled.button`
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
`;
const Content = styled.div`
  margin-top: 0px;
`;
const Title = styled.h1`
  font-size: 28px;
  margin: 0;

  @media (min-width: 450px) {
    font-size: 32px;
  }
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h3 {
    margin: 10px;
    font-size: 14px;
  }
  & button {
    color: white;
    padding: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.btn.primary};
  }
`;

export default function PostItem({ post = {} }) {
  const { title, image, excerpt, slug, date, author, author_image, category } =
    post;

  const imageSrc = `/images/posts/${slug}/${image}`;

  const formatedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <ImageContainer>
        <Img
          src={imageSrc}
          alt={title}
          width={300}
          height={250}
          layout="responsive"
        />
      </ImageContainer>
      <TimeWrapper>
        <Time>{formatedDate}</Time>
        <CategoryLabel>{category || "Javascript"}</CategoryLabel>
      </TimeWrapper>
      <ContentWrapper>
        <Content>
          <Link href={`/blog/${slug}`}>
            <a>
              <Title>{title}</Title>
            </a>
          </Link>
          <p>{excerpt}</p>
        </Content>

        <Action>
          <Link href={`/blog/${slug}`}>
            <button>Read More...</button>
          </Link>
          <Action>
            <Avatar src={author_image} alt={author} width={30} height={30} />
            <h3>{author}</h3>
          </Action>
        </Action>
      </ContentWrapper>
    </Card>
  );
}
