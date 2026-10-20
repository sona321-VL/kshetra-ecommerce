export default function SearchBar() {
  return (
    <div className="flex justify-center my-10">
      <input
        type="text"
        placeholder="Search heritage collections..."
        className="w-full max-w-2xl px-6 py-4 
                   bg-royalblack/60 border border-gold/40 
                   text-ivory placeholder:text-ivory/50 
                   outline-none focus:border-gold transition"
      />
    </div>
  );
}
