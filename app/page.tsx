import TagInput from "@/components/TagInput";

export default function Home() {
  const handleTagAdded = (tag: string) => {
    // Implement adding the tag or operation to your state or calculation logic.
    // You can use React Query or other state management.
    console.log("Added:", tag);
  };

  return (
    <div>
      <TagInput />
    </div>
  );
}
