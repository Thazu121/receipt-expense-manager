import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  scanReceipt,
  resetScan,
} from "../../redux/features/scanSlice";

import {
  useState,
  useEffect,
} from "react";

export default function FileUploadCard() {
  const dispatch = useDispatch();

  const {
    scanning,
    error,
    extracted,
  } = useSelector(
    (state) => state.scan
  );

  const [preview, setPreview] =
    useState(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  const handleUpload = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please upload an image file"
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image must be less than 5MB"
      );
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);

    dispatch(
      scanReceipt(file)
    );
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    setPreview(null);

    dispatch(
      resetScan()
    );
  };

  return (
    <div
      className="
        p-6
        rounded-2xl
        border
        bg-white
        shadow-sm
      "
    >
      {!preview && (
        <label
          className="
            block
            border-2
            border-dashed
            border-gray-300
            rounded-xl
            p-10
            text-center
            cursor-pointer
            hover:border-emerald-500
            transition
          "
        >
          <div>
            <p className="font-medium">
              Upload Receipt
            </p>

            <p className="text-sm text-gray-500 mt-2">
              JPG, PNG, WEBP
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleUpload
            }
            className="hidden"
          />
        </label>
      )}

      {preview && (
        <div className="space-y-4">
          <img
            src={preview}
            alt="Receipt Preview"
            className="
              w-full
              rounded-xl
              max-h-[400px]
              object-contain
            "
          />

          <button
            onClick={
              handleRemove
            }
            className="
              px-4
              py-2
              bg-red-500
              hover:bg-red-600
              text-white
              rounded-lg
            "
          >
            Remove
          </button>
        </div>
      )}

      {scanning && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-5
              h-5
              border-2
              border-emerald-500
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <span>
            Scanning Receipt...
          </span>
        </div>
      )}

      {error && (
        <div
          className="
            mt-4
            p-3
            rounded-lg
            bg-red-100
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {extracted?.merchant && (
        <div
          className="
            mt-6
            p-4
            rounded-xl
            border
            bg-gray-50
          "
        >
          <h3
            className="
              font-semibold
              mb-3
            "
          >
            Extracted Details
          </h3>

          <div className="space-y-2">
            <p>
              <strong>
                Merchant:
              </strong>{" "}
              {
                extracted.merchant
              }
            </p>

            <p>
              <strong>
                Amount:
              </strong>{" "}
              ₹
              {
                extracted.amount
              }
            </p>

            <p>
              <strong>
                Date:
              </strong>{" "}
              {
                extracted.date
              }
            </p>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {
                extracted.category
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}