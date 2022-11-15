import styled from "styled-components";

const Btn = styled.button`
  color: #7a85ff;
  border: none;
  border-radius: 0.5em;
  font-size: 0.75em;
  background: none;
  color: #7a85ff;
  padding: 0.25em;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover,
  :focus-visible {
    color: #7a85ff;
  }

  .icon-btn-active {
    color: #7a85ff;
  }

  .icon-btn-active {
    position: relative;

    ::before {
      content: "×";
      position: absolute;
      font-size: 0.75em;
      width: 1em;
      height: 1em;
      color: white;
      background-color: red;
      border-radius: 50%;
      top: 0.95em;
      left: 0.95em;
    }
  }

  & .icon-btn-active .icon-mg {
    margin-right: 0.25em;
  }
`;

export default function IconBtn({ Icon, color, children, isActive, ...props }) {
  return (
    <Btn {...props}>
      <span
        className={`${children !== null ? "icon-mg" : ""} ${
          isActive ? "icon-btn-active" : ""
        }`}
      >
        <Icon color={color} />
      </span>

      {children}
    </Btn>
  );
}
