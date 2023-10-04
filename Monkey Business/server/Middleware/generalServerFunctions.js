export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
// Regular Expression for email validation just checks for No White Space \S, At Sign @, and ONE period \.
