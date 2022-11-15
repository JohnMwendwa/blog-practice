import styled from "styled-components";

const Btn = styled.button`
  --hue: 235;
  --color: hsl(var(--hue), 100%, 67%);
  border: none;
  border-radius: 0.5em;
  font-size: 0.75em;
  background: none;
  color: var(--color);
  padding: 0.25em;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover,
  :focus-visible {
    --color: hsl(var(--hue), 100%, 74%);
  }

  .icon-btn-active,
  .icon-btn.danger {
    --hue: 0;
  }

  .icon-btn-active {
    position: relative;

    ::before {
      content: "00D7";
      position: absolute;
      font-size: 0.75em;
      width: 1em;
      height: 1em;
      color: white;
      background-color: var(--color);
      border-radius: 50%;
      bottom: 0.1em;
      right: 0.1em;
    }
  }

  .icon-btn-active .icon-mg {
    margin-right: 0.25em;
  }
`;

export default function IconBtn({
  Icon,
  color,
  children,
  isActive = true,
  ...props
}) {
  return (
    <Btn {...props}>
      <span className={`${children !== null ? "icon-mg" : ""}`}>
        <Icon
          color={color}
          className={`${isActive ? "icon-btn-active" : ""}`}
        />
      </span>

      {children}
    </Btn>
  );
}
