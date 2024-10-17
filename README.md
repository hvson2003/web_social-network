# Ứng dụng mạng xã hội (Node.js, SQL)

## Tổng quan dự án
Đây là một ứng dụng mạng xã hội toàn diện với frontend phát triển bằng React và backend sử dụng Node.js, cùng cơ sở dữ liệu MySQL. Ứng dụng này tận dụng các công nghệ hiện đại như hooks, Context API, React-query để quản lý trạng thái và đồng bộ hóa dữ liệu từ server, JWT (JSON Web Tokens) để xác thực người dùng, và cookies để quản lý phiên đăng nhập.

### Công nghệ sử dụng:
- **Backend**: Node.js với framework Express.js.
  - **MySQL**: Quản lý dữ liệu quan hệ, lưu trữ thông tin người dùng, bài viết, bình luận, lượt thích, và nhiều hơn nữa.
  - **JWT (JSON Web Tokens)**: Để xác thực người dùng một cách an toàn.
  - **Cookies**: Để duy trì phiên đăng nhập và theo dõi trạng thái đăng nhập của người dùng.
- **API**: Cung cấp API RESTful cho toàn bộ các chức năng của backend, bao gồm xác thực người dùng, tạo bài viết, lấy dữ liệu dòng thời gian, v.v.

- **Frontend**: Sử dụng React với Hooks và Context API để quản lý trạng thái.
  - **React-query**: Đồng bộ hóa dữ liệu server một cách hiệu quả.
  - **Axios**: Để xử lý các yêu cầu HTTP giữa client và backend.
  - **CSS Modules / Tailwind**: (tùy dự án của bạn) để tạo kiểu dáng modular và dễ mở rộng.

