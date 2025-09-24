module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    description: "API documentation for Task Manager",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Category: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "68d283cd1000b4229b9f4e4c",
          },
          name: {
            type: "string",
            example: "Work",
          },
          description: {
            type: "string",
            example: "Tasks related to work",
          },
        },
      },
      Task: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "68d283cd1000b4229b9f4e4c",
          },
          title: {
            type: "string",
            example: "Task 1",
          },
          description: {
            type: "string",
            example: "Description of task 1",
          },
        },
      },
    },
  },

  paths: {
    ...require("./category.json").paths,
    ...require("./task.json").paths,
  },
};
