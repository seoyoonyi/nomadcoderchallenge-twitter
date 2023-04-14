import Link from "next/link";

interface ItemProps {
  text: string;
  id: number;
  hearts: number;
}

export default function Item({ text, hearts, id }: ItemProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <li>
        <p>Tweet content: {text}</p>
        <p>Number of likes: {hearts}</p>
      </li>
    </Link>
  );
}
