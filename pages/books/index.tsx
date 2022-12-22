import { NextPage } from "next";
import React from "react";

import Layout from "../../layout";
import BooksContainer from "../../@modules/books/components/BooksContainer";

const books: NextPage = () => {
  return (
    <Layout>
      <BooksContainer />
    </Layout>
  );
};

export default books;
