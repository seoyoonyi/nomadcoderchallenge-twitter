import { User } from "lucide-react";
import Link from "next/link";

interface ItemProps {
  text: string;
  id: number;
  hearts: number;
  name: string;
}

export default function Item({ text, hearts, id, name }: ItemProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <li className="flex h-24 max-w-2xl px-4 pt-3 pb-2 mx-auto border-b cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 mr-3 bg-gray-300 rounded-full">
          <User className="w-full h-full p-2 stroke-zinc-400" />
        </div>
        <div>
          <p className="font-bold text-gray-700">{name}</p>
          <p className="text-gray-700">{text}</p>
          <p className="text-gray-500">{hearts} likes</p>
        </div>
      </li>
    </Link>
  );
}
