import { FormattedMessage, useIntl } from "react-intl";
import { HomePageWrapper } from "./HomePageWrapper";

export const HomePage = ({ locale, onLocaleChange }) => {
  const { formatMessage } = useIntl();

  return (
    <HomePageWrapper className="hpw">
      <div className="hpw-header">
        <select value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
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
