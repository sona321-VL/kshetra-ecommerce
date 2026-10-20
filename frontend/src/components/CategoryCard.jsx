export default function CategoryCard({ title, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[320px] w-full object-cover 
                     transform group-hover:scale-105 
                     transition duration-1000"
        />
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-gold font-serif text-xl tracking-wide">
          {title}
        </h3>

        <div className="w-12 h-[2px] bg-gold mt-4 mx-auto"></div>
      </div>
    </div>
  );
}
