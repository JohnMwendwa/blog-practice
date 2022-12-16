import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
`;

const ImageContainer = styled.figure`
  width: 100%;
  max-height: 13rem;
  background-color: grey;
  margin: 0 auto;
  overflow: hidden;
`;
const Img = styled(Image)`
  object-fit: fill;
  border-radius: 5px;
  width: 300px;
  height: 170px;
`;

const Avatar = styled(Image)`
  background-color: grey;
  border-radius: 50%;
`;
const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  height: 30px;
  background-color: grey;
  position: relative;
`;
const Time = styled.time`
  color: white;
  text-align: start;
`;
const CategoryLabel = styled.button`
  position: absolute;
  top: 0;
  right: -1px;
  height: 30px;
  background-color: black;
  color: white;
  padding: 3px 10px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 0px;
`;
const Title = styled.h2`
  font-size: 28px;
  line-height: 1.2;
  margin: 0;

  @media (min-width: 600px) {
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
const EditBtn = styled.div`
  position: absolute;
  left: -90px;
  top: 65px;
  transform: rotate(270deg);

  & button {
    color: white;
    background-color: ${(props) => props.theme.colors.btn.primary};
    margin-left: 5px;
    padding: 3px 8px;
    border: none;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;

    :last-child {
      background-color: red;
    }
  }
`;

export default function PostItem({ post, isEdit, onDeletePost, onEditPost }) {
  const {
    title,
    description,
    category,
    date_uploaded,
    slug,
    _id: postId,
    author,
    imgSrc,
  } = post;

  const formatedDate = new Date(date_uploaded).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Card>
        {isEdit && (
          <EditBtn>
            <button onClick={() => onEditPost(slug)}>
              Edit <FaEdit />
            </button>
            <button onClick={() => onDeletePost(postId)}>
              Delete <FaTrash />
            </button>
          </EditBtn>
        )}
        <ImageContainer>
          <Img
            src={imgSrc}
            alt={title}
            width={300}
            height={170}
            layout="responsive"
          />
        </ImageContainer>
        <TimeWrapper>
          <Time>{formatedDate}</Time>
          <CategoryLabel>{category}</CategoryLabel>
        </TimeWrapper>
        <ContentWrapper>
          <Content>
            <Link href={`/${encodeURIComponent(slug)}`}>
              <a title="Read more about this article">
                <Title>{title}</Title>
              </a>
            </Link>
            <p>{description}</p>
          </Content>

          <Action>
            <Link href={`/${encodeURIComponent(slug)}`}>
              <a title="Read more about this article">
                <button>Read More...</button>
              </a>
            </Link>
            <Action>
              {/* <Avatar src={author_image} alt={author} width={30} height={30} /> */}
              <h3>
                {author.firstName} {author.lastName}
              </h3>
            </Action>
          </Action>
        </ContentWrapper>
      </Card>
    </>
  );
}
