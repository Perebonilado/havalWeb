import React, { FC } from "react";

import Layout from "../../layout";
import BookView from "../../@modules/books/components/BookView";

const Book: FC = () => {
  return <Layout><BookView /></Layout>;
};

export default Book;
