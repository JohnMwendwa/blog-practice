import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Btn = styled.button`
  padding: 5px 10px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  background-color: ${(c) => c.theme.colors.ui.secondary};
  color: white;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};
  font-size: 1.25rem;

  & span {
    font-weight: bold;
    padding: 3px;
  }
`;

export default function Articles() {
  return (
    <Wrapper>
      <h2>My Articles</h2>
      <Link href="/admin/articles/new">
        <a>
          <Btn>
            <span>+</span> Create New
          </Btn>
        </a>
      </Link>
    </Wrapper>
  );
}
