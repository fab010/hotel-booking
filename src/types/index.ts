export type UserType = {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  stripeId: string;
  userId: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  createdAt: Date;
};

export type BookingParams = {
  stripeId: string;
  userId: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  createdAt: Date;
};

export type BookingHotelParams = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  userId: string;
};

export type SearchHotelQuery = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};


export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};


export type RegisterDataType = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  confirmPassword: String;
};

export type SignInDataType = {
  email: string;
  password: string;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};
