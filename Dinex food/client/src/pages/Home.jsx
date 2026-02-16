import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const featuredRestaurants = [
    {
      id: 1,
      name: "Spice Kingdom",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "30-40 mins",
      image: "🏪",
    },
    {
      id: 2,
      name: "Pizza Paradise",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "25-35 mins",
      image: "🍕",
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "35-45 mins",
      image: "🥢",
    },
    {
      id: 4,
      name: "Burger Haven",
      cuisine: "American",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      image: "🍔",
    },
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Spice Kingdom",
      price: 299,
      rating: 4.7,
      image: "🍛",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Paradise",
      price: 349,
      rating: 4.5,
      image: "🍕",
    },
    {
      id: 3,
      name: "Hakka Noodles",
      restaurant: "Dragon Wok",
      price: 249,
      rating: 4.6,
      image: "🍜",
    },
    {
      id: 4,
      name: "Classic Burger",
      restaurant: "Burger Haven",
      price: 199,
      rating: 4.4,
      image: "🍔",
    },
    {
      id: 5,
      name: "Tandoori Chicken",
      restaurant: "Spice Kingdom",
      price: 279,
      rating: 4.8,
      image: "🍖",
    },
    {
      id: 6,
      name: "Garlic Bread",
      restaurant: "Pizza Paradise",
      price: 99,
      rating: 4.3,
      image: "🥖",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden">
      <motion.div
        className="fixed top-10 left-10 w-72 h-72 bg-purple-300 opacity-20 blur-3xl rounded-full"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="fixed bottom-10 right-10 w-72 h-72 bg-purple-300 opacity-20 blur-3xl rounded-full"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />

      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Delicious Food, <br />
            <span className="bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h1>

          <p className="text-gray-600 text-lg">
            Discover the best meals from top-rated restaurants near you. Fresh
            ingredients, amazing taste, lightning-fast delivery.
          </p>

          <div className="flex gap-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/order-now")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              Order Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/contact")}
              className="px-8 py-3 rounded-xl border border-purple-300 text-purple-700 font-semibold bg-white"
            >
              Contact Us
            </motion.button>
          </div>

          <div className="flex gap-10 pt-8">
            {["500+ Restaurants", "50K+ Customers", "24/7 Support"].map(
              (item, i) => (
                <motion.div key={i} whileHover={{ y: -3 }}>
                  <p className="font-bold text-xl text-gray-800">
                    {item.split(" ")[0]}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {item.replace(item.split(" ")[0], "")}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-9xl"
          >
            🍽️
          </motion.div>
        </motion.div>
      </section>

      <Section title="Featured Restaurants">
        {featuredRestaurants.map((r, i) => (
          <Card key={r.id} delay={i * 0.1}>
            <div className="h-32 flex items-center justify-center text-6xl bg-gradient-to-br from-purple-400 to-purple-400">
              {r.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.cuisine}</p>
              <div className="flex justify-between text-sm mt-2">
                <span>⭐ {r.rating}</span>
                <span>{r.deliveryTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </Section>

      <Section title="Popular Dishes">
        {popularDishes.map((d, i) => (
          <Card key={d.id} delay={i * 0.05}>
            <div className="h-40 flex items-center justify-center text-7xl bg-gradient-to-br from-purple-300 to-purple-300">
              {d.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-sm text-gray-500">{d.restaurant}</p>
              <div className="flex justify-between mt-2">
                <span className="font-bold text-purple-600">₹{d.price}</span>
                <span>⭐ {d.rating}</span>
              </div>
              <button className="w-full mt-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
                Add to Cart
              </button>
            </div>
          </Card>
        ))}
      </Section>

      <section className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Ready to Order?
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/order-now")}
          className="mt-6 px-10 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-600 text-white font-semibold shadow-lg"
        >
          Start Ordering 
        </motion.button>
      </section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="max-w-6xl mx-auto px-4 py-10">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-3xl font-bold mb-6"
    >
      {title}
    </motion.h2>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{children}</div>
  </section>
);

const Card = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -6 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
  >
    {children}
  </motion.div>
);

export default Home;
