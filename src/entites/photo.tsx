import React, { forwardRef } from "react";

function Photo(
  {
    files,
    setFiles,
    deleteFileId,
    setDeleteFileId,
  }: {
    files: File[];
    setFiles: (files: File[]) => void;
    deleteFileId?: number[];
    setDeleteFileId?: (deleteFileId: number[]) => void;
  },
  ref: React.Ref<HTMLInputElement>
) {
  const [imgPath, setImgPath] = React.useState<
    {
      name: string;
      size: number;
      previewPath?: string;
      id: number;
      managementId?: number;
      articleId?: string;
      path?: string;
      ext?: string;
      answerFileYn?: string;
    }[]
  >([]);
  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setFiles([...files, e.target.files[0]]);
            setImgPath([
              ...imgPath,
              {
                id: e.target.files[0].lastModified,
                name: e.target.files[0].name,
                size: e.target.files[0].size,
                previewPath: URL.createObjectURL(e.target.files[0]),
              },
            ]);
          }
        }}
      />
      {imgPath.map((img) => (
        <div
          key={img.id}
          onClick={() => {
            setFiles(files.filter((file) => file.name !== img.name));
            if (img.path && setDeleteFileId && deleteFileId) {
              setDeleteFileId([...deleteFileId, img.id]);
            } else {
              setImgPath(imgPath.filter((path) => path.name !== img.name));
            }
          }}
        >
          <img src={img.path || img.previewPath} alt={img.name} />
          <span></span>
        </div>
      ))}
    </div>
  );
}
export default forwardRef(Photo);
