import React from "react";
import {
  renderDob,
  renderFullName,
  renderKey,
  renderPhone,
} from "../render-fields";
interface IDynamicFieldsResearchLibraryCard {
  isChosenResearchInfo: boolean;
  errors: any;
  register: any;
}
const DynamicFieldsResearchLibraryCard = ({
  isChosenResearchInfo,
  errors,
  register,
}: IDynamicFieldsResearchLibraryCard) => {
  switch (isChosenResearchInfo) {
    case true:
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}

          {/* Birth */}
          {renderDob(register, errors)}

          {/* Phone */}
          {renderPhone(register, errors)}
        </div>
      );
    case false:
      return (
        <div className="mt-3">
          {/* Key */}
          {renderKey(register, errors)}
        </div>
      );
    default:
      return <div></div>;
  }
};

export default DynamicFieldsResearchLibraryCard;
