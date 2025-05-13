"use client";

const FileUploadField = ({ field, values, setFieldValue }: any) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const files =
    values[field.name] || (field.fileProps?.variant === "multi" ? [] : null);
  const isMultiple = field.fileProps?.variant === "multi";
  const maxFiles = field.fileProps?.maxFiles || 10;
  const maxSize = field.fileProps?.maxSize || 5242880; // 5MB default
  const acceptedTypes = field.fileProps?.accept || "";

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    if (isMultiple) {
      const currentFiles = [...(values[field.name] || [])];

      // Check if adding these files would exceed the max count
      if (currentFiles.length + fileList.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      // Process each file
      Array.from(fileList).forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          alert(
            `File ${file.name} is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`,
          );
          return;
        }

        // Add file to array
        currentFiles.push(file);
      });

      setFieldValue(field.name, currentFiles);
    } else {
      // Single file upload
      const file = fileList[0];

      // Check file size
      if (file.size > maxSize) {
        alert(
          `File is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`,
        );
        return;
      }

      setFieldValue(field.name, file);
    }
  };

  const removeFile = (index: number) => {
    if (isMultiple) {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFieldValue(field.name, newFiles);
    } else {
      setFieldValue(field.name, null);
    }
  };

  // Function to get file icon based on extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return (
          <svg
            className="h-6 w-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M181.9 256.1c-5.1-9.1-9.1-19.4-11.3-29.8c-7.2 8.1-14.2 16.7-20.9 25.9c-11.4 15.7-22 32.1-30.7 49.1c17.4-7.5 35.1-13.1 53.5-14.7c.8-11.5 3.7-22.1 9.4-30.5zm10.8-12.6c2.8 14.6 8.1 29 15.5 41.5c4.5 7.8 9.7 14.2 15.2 19.5c13.4-3.1 26.7-8.6 39.7-15.7c-7.4-15-19.4-26.4-34-32.8c-9.8-4.3-21.9-6.9-36.7-6.9c.2-2.3.3-4.7.3-5.6zm42.8 77.5c-9.9-4.6-19.4-11.1-27.8-20c-27.2 6.8-44.9 14.4-67.6 26.9c20.8 5.3 40.9 8 59.2 8c19.5 0 37.2-2.5 54.5-8.4c-5.7-2.4-11.7-4.8-18.3-7.7zm-13.6-50.6c15.4 4.4 25.8 13.5 31.4 24.6c12.6-9.5 24.4-21.5 33.6-36.2c-30.6-29.3-75.1-28.2-134.7-28.2c14.3 20.5 35.7 53.6 69.7 39.8zm49.7 83.5c-50.2 15.1-96.5 5.6-110.7 0c-12.7 10.6-23.2 22.8-32.4 36.2H123c12.3-21.2 27.3-39.7 46.3-51.6c-10.9-8.3-26.4-11.8-42-11.8c-20.6 0-42.8 5.6-64.8 15.8c-2.1 19.4-2.1 38.7 0 58.1c2.1 3.3 4.3 6.6 6.7 9.7c38.1-7.3 75.5 4.1 123.3 4.1c8.7 0 17.5-.4 26.3-1.2c-4.9-7.9-9.1-16.5-12.5-25.3c-2.2-5.8-4-11.7-5.4-17.7c-5.1 1.7-10.4 3-16.2 4.1zm54.9 22.6c7.1 25.4 5.2 53.8-7.1 80.9c5.2-13.4 8-27.4 8-41.2c0-11.2-1.9-22.2-5.7-32.7c-8.1-12.7-18.5-23.7-31.5-34c-1.3 1.5-2.5 3-3.7 4.3c1.9 3.9 3.5 7.9 4.7 11.9c3.9 12.3 5.7 24.2 5.2 36.3c13.7-4.9 23.5-13.1 30.1-25.5z" />
          </svg>
        );
      case "doc":
      case "docx":
        return (
          <svg
            className="h-6 w-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm57.1 120H305c7.7 0 13.4 7.1 11.7 14.7l-38 168c-1.2 5.5-6.1 9.3-11.7 9.3h-38c-5.5 0-10.3-3.8-11.6-9.1-25.8-103.5-20.8-81.2-25.6-110.5h-.5c-1.1 14.3-2.4 17.4-25.6 110.5-1.3 5.3-6.1 9.1-11.6 9.1H117c-5.6 0-10.5-3.9-11.7-9.4l-37.8-168c-1.7-7.5 4-14.6 11.7-14.6h24.5c5.7 0 10.7 4 11.8 9.7 15.6 78 20.1 109.5 21 122.2 1.6-10.2 7.3-32.7 29.4-122.7 1.3-5.4 6.1-9.1 11.7-9.1h29.1c5.6 0 10.4 3.8 11.7 9.2 24 100.4 28.8 124 29.6 129.4-.2-11.2-2.6-17.8 21.6-129.2 1-5.6 5.9-9.5 11.5-9.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
          </svg>
        );
      case "xls":
      case "xlsx":
        return (
          <svg
            className="h-6 w-6 text-green-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5L160 336l-60.1-93.5c-5.1-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
          </svg>
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "webp":
        return (
          <svg
            className="h-6 w-6 text-purple-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
          </svg>
        );
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return (
          <svg
            className="h-6 w-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zM128.4 336c-17.9 0-32.4 12.1-32.4 27c0 15 14.6 27 32.5 27s32.4-12.1 32.4-27s-14.6-27-32.5-27zM0 384v80c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-80H0zm32-48h320v-84.7c0-46.4-55.8-86.3-128-86.3c-72.1 0-128 39.9-128 86.3V336zm119.6-80h-39.3v62.4L128 432l15.7-13.9c2.1-1.9 3.3-4.7 3.3-7.4v-61.2c0-9.9-6.7-18-16-18.4zm-83.6-38.4v-96h56v56c0 4.4 3.6 8 8 8h56v32h-56c-4.4 0-8 3.6-8 8v24h-56v-32zM288 0v128h128V48c0-26.5-21.5-48-48-48H288z" />
          </svg>
        );
      default:
        return (
          <svg
            className="h-6 w-6 text-gray-500"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full">
      {/* File Drop Area */}
      <div
        className={`relative rounded-md border-2 border-dashed p-6 ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600"
        } flex cursor-pointer flex-col items-center justify-center transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg
          className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">
            Click to upload
          </span>{" "}
          or drag and drop
          <p className="mt-1">
            {isMultiple ? `Up to ${maxFiles} files` : "Single file"}
          </p>
          {acceptedTypes && (
            <p className="mt-1 text-xs">Accepted formats: {acceptedTypes}</p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={acceptedTypes}
          multiple={isMultiple}
        />
      </div>

      {/* File Preview Area */}
      {files && (isMultiple ? files.length > 0 : files) && (
        <div
          className={`mt-3 ${isMultiple ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" : ""}`}
        >
          {isMultiple ? (
            // Multiple files preview
            files.map((file: File, index: number) => (
              <div
                key={index}
                className="group relative flex items-center rounded-md bg-gray-50 p-3 shadow-sm dark:bg-gray-800"
              >
                <div className="mr-3 flex-shrink-0">
                  {getFileIcon(file.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024).toFixed(1)}KB
                  </p>
                </div>
                <button
                  type="button"
                  className="invisible absolute right-2 top-2 text-gray-400 hover:text-red-500 focus:outline-none group-hover:visible"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            // Single file preview
            <div className="group relative flex items-center rounded-md bg-gray-50 p-3 shadow-sm dark:bg-gray-800">
              <div className="mr-3 flex-shrink-0">
                {getFileIcon(files.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {files.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(files.size / 1024).toFixed(1)}KB
                </p>
              </div>
              <button
                type="button"
                className="invisible absolute right-2 top-2 text-gray-400 hover:text-red-500 focus:outline-none group-hover:visible"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(0);
                }}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { useState } from "react";

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "checkbox" | "date" | "radio" | "select" | "file" | "number";
  placeholder?: string;
  validation?: any;
  options?: { label: string; value: string }[];
  colSpan?: 1 | 2 | 3;
  fileProps?: {
    variant: "single" | "multi";
    accept?: string;
    maxFiles?: number;
    maxSize?: number; // in bytes
  };
  radioProps?: {
    variant: "row" | "column";
  };
};

type ModalFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, any>) => void;
  fields: FieldConfig[];
  columns?: number;
  title?: string;
  description?: string;
  initialValues?: Record<string, any>;
  validationSchema?: Yup.Schema | null;
  loading?: boolean;
  onReset?: () => void;
};

export function ModalForm({
  open,
  onOpenChange,
  onSubmit,
  fields,
  columns = 1,
  title = "Form Title",
  description = "Fill out the form below.",
  initialValues: propInitialValues,
  validationSchema = null,
  loading = false,
  onReset,
}: ModalFormProps) {
  const defaultInitialValues = fields.reduce(
    (acc, field) => {
      if (field.type === "checkbox") acc[field.name] = false;
      else if (field.type === "date") acc[field.name] = null;
      else if (field.type === "file")
        acc[field.name] = field.fileProps?.variant === "multi" ? [] : null;
      else acc[field.name] = "";
      return acc;
    },
    {} as Record<string, any>,
  );

  // Use provided initialValues or fall back to generated defaults
  const initialValues = propInitialValues || defaultInitialValues;

  const validations =
    validationSchema ||
    Yup.object(
      fields.reduce(
        (acc, field) => {
          if (field.validation) acc[field.name] = field.validation;
          return acc;
        },
        {} as Record<string, any>,
      ),
    );

  // Handle close with reset option
  const handleClose = () => {
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex max-h-[70vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, resetForm }: any) => (
              <Form
                className={`grid ${columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-1 md:grid-cols-2" : columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-5`}
              >
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`flex flex-col space-y-1 ${
                      field.colSpan === 2
                        ? "col-span-1 md:col-span-2"
                        : field.colSpan === 3
                          ? "col-span-1 md:col-span-3"
                          : "col-span-1"
                    }`}
                  >
                    {field.type !== "checkbox" && (
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {field.label}
                      </label>
                    )}

                    {field.type === "text" && (
                      <Field
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    )}
                    {field.type === "number" && (
                      <Field
                      type = "number"
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    )}

                    {field.type === "checkbox" && (
                      <div className="flex items-center space-x-2">
                        <Field
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {field.label}
                        </label>
                      </div>
                    )}

                    {field.type === "date" && (
                      <Field
                        type="date"
                        id={field.name}
                        name={field.name}
                        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    )}

                    {field.type === "radio" && field.options && (
                      <div
                        className={`flex ${
                          field.radioProps?.variant === "row"
                            ? "flex-row space-x-4"
                            : "flex-col space-y-2"
                        }`}
                      >
                        {field.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <Field
                              type="radio"
                              id={`${field.name}-${option.value}`}
                              name={field.name}
                              value={option.value}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`${field.name}-${option.value}`}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {field.type === "select" && field.options && (
                      <Field
                        as="select"
                        id={field.name}
                        name={field.name}
                        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    )}

                    {field.type === "file" && (
                      <FileUploadField
                        field={field}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    )}

                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                ))}

                <div
                  className={`${columns > 1 ? "col-span-1 md:col-span-2" : "col-span-1"} ${columns > 2 ? "md:col-span-3" : ""} mt-4 flex justify-end space-x-3`}
                >
                  {onReset && (
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        onReset();
                      }}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      disabled={loading}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}