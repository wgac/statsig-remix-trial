import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useGate } from "statsig-react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { value, isLoading } = useGate("404_main_background");
  console.log({ value, isLoading });
  const backgroundColor = value ? "lightblue" : "grey";
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        backgroundColor,
      }}
    >
      <h1>Hello World</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <Link to="/people">People</Link>
        </li>
      </ul>
    </div>
  );
}
