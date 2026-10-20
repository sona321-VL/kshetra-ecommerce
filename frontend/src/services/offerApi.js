import api from "./api"; // your axios instance file

// APPLY OFFER
export const applyOffer = async (productId, offerData) => {
  const res = await api.put(`/offers/apply/${productId}`, offerData);
  return res.data;
};

// REMOVE OFFER
export const removeOffer = async (productId) => {
  const res = await api.put(`/offers/remove/${productId}`);
  return res.data;
};
