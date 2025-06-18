import type { ChangeEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import type { Locale } from "@/config/config";
import { setLocaleValue } from "@/store/extraSlice";
import { localeSelector } from "@/store/extraSlice/selectors";

import { HomePageWrapper } from "./HomePageWrapper";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const locale = useSelector(localeSelector);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocaleValue(e.target.value as Locale));
  };

  return (
    <HomePageWrapper className="hpw">
      <div className="hpw-header">
        <select value={locale} onChange={handleChange}>
          <option value="en">en</option>
          <option value="ja">jp</option>
        </select>
      </div>

      <FormattedMessage id="simple" />
      {formatMessage({ id: "simple" })}
      <br />
      <FormattedMessage id="argument" values={{ name: "John" }} />
    </HomePageWrapper>
  );
};
