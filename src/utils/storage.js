// Storage utilities for managing captured monster counts
export function getCapturedCount(id) {
  const val = localStorage.getItem('captured_' + id);
  return val ? parseInt(val, 10) : 0;
}

export function setCapturedCount(id, val) {
  localStorage.setItem('captured_' + id, String(val));
} 