import { useState } from "react";
import Button from "./Button";

type TodoCreateProps = {
  onAdd: (todoText: string) => Promise<void>;
};

type TodoData = {
  title: string;
  error: string;
  loading: boolean;
};

export default function TodoAdd({ onAdd }: TodoCreateProps) {
  const [{ title, error, loading }, setData] = useState<TodoData>({
    title: "",
    error: "",
    loading: false,
  });

  const handleClick = async () => {
    if (!title) {
      setData({ title, loading, error: "Todo text cannot be empty" });
      return;
    }

    setData({ title, error, loading: true });
    await onAdd(title);
    setData({ title: "", error: "", loading: false });
  };

  return (
    <div className="flex items-start justify-center">
      <div>
        <input
          className="border-2 border-black px-2 py-1"
          value={title}
          onChange={(e) => setData({ title: e.target.value, error, loading })}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-1 border-2 border-black bg-black text-white ml-4"
      >
        {loading ? "Add..." : "Add"}
      </Button>
    </div>
  );
}
