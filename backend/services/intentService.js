import natural from "natural";

const classifier = new natural.BayesClassifier();

classifier.addDocument("show sarees", "product_search");
classifier.addDocument("silk saree", "product_search");
classifier.addDocument("traditional saree", "product_search");

classifier.addDocument("track my order", "order_tracking");
classifier.addDocument("where is my order", "order_tracking");

classifier.addDocument("recommend something", "recommendation");
classifier.addDocument("best products", "recommendation");

classifier.addDocument("price range", "price");

classifier.train();

export const detectIntent = (message) => {
  return classifier.classify(message);
};