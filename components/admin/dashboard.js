import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { Banner } from "./settings";

const DashBanner = styled(Banner)`
  padding-bottom: 20px;

  & p {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    text-transform: capitalize;
    margin: 5px 0;
  }
`;

const Cards = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex: 1;
  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 1px solid blue;
  width: 200px;
  height: 100px;

  & h3 {
    margin: 0;
  }
  & p {
    font-size: 2rem;
    margin: 0;
  }
`;

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      <DashBanner>
        <h2>Dashboard</h2>
        <p>Welcome, {session?.user.name} </p>
      </DashBanner>
      <Cards>
        <Link href="/admin/messages">
          <a>
            <Card>
              <p>📨</p>
              <h3>Messages</h3>
            </Card>
          </a>
        </Link>

        <Link href="/admin/articles">
          <a>
            <Card>
              <p>📚</p>
              <h3>Articles</h3>
            </Card>
          </a>
        </Link>

        <Link href="/admin/settings">
          <a>
            <Card>
              <p>⚙</p>
              <h3>Settings</h3>
            </Card>
          </a>
        </Link>

        <Link href="/admin/comments">
          <a>
            <Card>
              <p>📩</p>
              <h3>Comments</h3>
            </Card>
          </a>
        </Link>
      </Cards>
    </>
  );
}
