import  { forwardRef, Ref, useState } from "react";

const limitMegabyteSize = (fileSize:number, max:number) => {
    const oneMegabyte = 1024 ** 2 // 10MB
    const maxSize = oneMegabyte * max

    return maxSize > fileSize
};

function Photo(
  {
    files,
    setFiles,
    deleteFileId,
    setDeleteFileId,
    id,
    readOnly,
    disabled,
    maxSize = 10,
    ...HTMLInputElementProps
  }: photoProps,
  ref: Ref<HTMLInputElement>
) {
  const [imgPath, setImgPath] = useState<imagePathType[]>([]);

  return (
    <div>
      {!readOnly && !disabled && (
        <input
          ref={ref}
          {...HTMLInputElementProps}
          type="file"
          accept="image/*"
          value=""
          id={id}
          onChange={(e) => {
            if (!e.target.files) return;
            if(maxSize && !limitMegabyteSize((e.target.files[0]).size, maxSize)) return alert(`${maxSize}MB 이하의 파일만 업로드 가능합니다.`)
            setFiles([e.target.files[0], ...files]);
            setImgPath([
              ...imgPath,
              {
                id: e.target.files[0].lastModified,
                name: e.target.files[0].name,
                size: e.target.files[0].size,
                previewPath: URL.createObjectURL(e.target.files[0]),
              },
            ]);
          }}
        />
      )}
      {imgPath.map((img) => (
        <div
          key={img.id}
          onClick={() => {
            if (readOnly || disabled) return;
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
Photo.displayName = "Photo";
export default forwardRef(Photo);
