import React from "react";
import CustomSkeleton from "@/modules/common/components/custom-skeleton";
import {
  renderAddress,
  renderCMND,
  renderDob,
  renderEmail,
  renderFullName,
  renderGender,
  renderJob,
  renderLevel,
  renderNation,
  renderPhone,
  renderRepresentative,
  renderSchool,
  renderWorkplace,
} from "../render-fields";

const DynamicFieldsRegisterLibrary = ({
  cardType,
  errors,
  register,
  job,
  educationLevel,
}: any) => {
  switch (cardType) {
    case "thuvien":
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}
          {/* Gender */}
          {renderGender(register, errors)}
          {/* Birth */}
          {renderDob(register, errors)}
          {/* CMND/CCCD */}
          {renderCMND(register, errors)}
          {/* Address */}
          {renderAddress(register, errors)}
          {/* Email */}
          {renderEmail(register, errors)}
          {/* Phone */}
          {renderPhone(register, errors)}
          {/* Job */}
          {renderJob(register, errors, true, job)}
          {/* Workplace */}
          {renderWorkplace(register, errors)}
          {/* Nationality */}
          {renderNation(register, errors)}
        </div>
      );
    case "thieunhi":
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}
          {/* Gender */}
          {renderGender(register, errors)}
          {/* Birth */}
          {renderDob(register, errors)}
          {/* CMND/CCCD */}
          {renderCMND(register, errors, false)}
          {/* Address */}
          {renderAddress(register, errors)}
          {/* Email */}
          {renderEmail(register, errors, false)}
          {/* Phone */}
          {renderPhone(register, errors)}
          {/* Job */}
          {renderJob(register, errors, true, job)}
          {/* School / Nơi làm việc*/}
          {renderSchool(register, errors)}
          {/* Nationality */}
          {renderNation(register, errors)}
        </div>
      );
    case "thieunhigiamho":
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}
          {/* representative */}
          {renderRepresentative(register, errors)}
          {/* Gender */}
          {renderGender(register, errors)}
          {/* Birth */}
          {renderDob(register, errors)}
          {/* CMND/CCCD */}
          {renderCMND(register, errors, false)}
          {/* Address */}
          {renderAddress(register, errors)}
          {/* Email */}
          {renderEmail(register, errors, false)}
          {/* Phone */}
          {renderPhone(register, errors)}
          {/* Job */}
          {renderJob(register, errors, true, job)}
          {/* Workplace */}
          {renderSchool(register, errors)}
          {/* Nationality */}
          {renderNation(register, errors)}
        </div>
      );
    case "canbohuutri":
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}
          {/* Gender */}
          {renderGender(register, errors)}
          {/* Birth */}
          {renderDob(register, errors)}
          {/* CMND/CCCD */}
          {renderCMND(register, errors)}
          {/* Address */}
          {renderAddress(register, errors)}
          {/* Email */}
          {renderEmail(register, errors, false)}
          {/* Phone */}
          {renderPhone(register, errors)}
          {/* Job */}
          {renderJob(register, errors, true, job)}
          {/* Workplace */}
          {renderWorkplace(register, errors, true, "Đơn vị")}
          {/* Nationality */}
          {renderNation(register, errors)}
        </div>
      );
    case "doanhnhan":
      return (
        <div className="mt-3">
          {/* Name */}
          {renderFullName(register, errors)}
          {/* Gender */}
          {renderGender(register, errors)}
          {/* CMND/CCCD */}
          {renderCMND(register, errors)}
          {/* Education level */}
          {renderLevel(register, errors, true, educationLevel)}
          {/* Birth */}
          {renderDob(register, errors)}
          {/* Job */}
          {renderJob(register, errors, true, job)}
          {/* Email */}
          {renderEmail(register, errors)}
          {/* Phone */}
          {renderPhone(register, errors)}
          {/* Workplace */}

          {renderWorkplace(register, errors, true, "Đơn vị công tác")}
          {/* Address */}
          {renderAddress(register, errors)}
          {/* Nationality */}
          {renderNation(register, errors)}
        </div>
      );
    default:
      return (
        <div className="mt-3">
          <CustomSkeleton variant="rounded" height="40rem" />
        </div>
      );
  }
};

export default DynamicFieldsRegisterLibrary;
