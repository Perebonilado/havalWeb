import React, { FC, useEffect, useState } from "react";

import { toast } from "react-toastify";

import SendTokenByEmailForm from "./SendTokenByEmailForm";
import TokenCounter from "./TokenCounter";
import { useGenerateSalesTokenMutation } from "../../../config/features/api";
import { SendTokenViaEmailPayload } from "../../../@types/Token";
import { GetBookByIdResponse } from "../../../@types/Book";
import PrintTokens from "./PrintTokens";

interface Props {
  token: string;
  book: GetBookByIdResponse | undefined;
  bookId: string;
  tokenEmailLoading: boolean;
  sendTokenEmail: Function;
}

const TokenGeneration: FC<Props> = ({
  token,
  book,
  bookId,
  tokenEmailLoading,
  sendTokenEmail,
}) => {
  const [tokenCount, setTokenCount] = useState<number>(1);
  const [
    generateSalesToken,
    {
      data: generateTokenData,
      isLoading: generateTokenLoading,
      isError: isGenerateTokenError,
      error: generateTokenError,
      isSuccess: isGenerateTokenSuccess,
    },
  ] = useGenerateSalesTokenMutation();

  const handleSendTokenEmail = ({ email }: { email: string }) => {
    if (generateTokenData && token && book) {
      const body: SendTokenViaEmailPayload = {
        assetName: generateTokenData.data[0].bookTitle,
        email: email,
        token: generateTokenData.data[0].token,
        auth_token: token,
        assetImage: book.data[0].coverImageUrl,
      };
      sendTokenEmail(body);
    }
  };

  useEffect(() => {
    if (generateTokenError) {
      const { data }: any = generateTokenError;
      toast.error(data?.message);
    }
  }, [generateTokenError]);

  const handleGenerateToken = () => {
    if (tokenCount > 0) {
      generateSalesToken({
        token: token,
        id: bookId,
        count: tokenCount,
      });
    } else toast.error("minimum value must be 1");
  };
  return (
    <>
      {isGenerateTokenSuccess ? (
        <>
          {tokenCount === 1 && (
            <SendTokenByEmailForm
              handleSendTokenEmail={handleSendTokenEmail}
              tokenEmailLoading={tokenEmailLoading}
              tokenData={generateTokenData?.data[0]}
              submitSuccess={isGenerateTokenSuccess}
            />
          )}
          {tokenCount > 1 && (
            <PrintTokens
              tokenCount={tokenCount}
              handlePrintTokens={() => null}
            />
          )}
        </>
      ) : (
        <TokenCounter
          tokenCount={tokenCount}
          setTokenCount={setTokenCount}
          handleGenerateToken={handleGenerateToken}
          tokenGenerationLoading={generateTokenLoading}
        />
      )}
    </>
  );
};

export default TokenGeneration;
