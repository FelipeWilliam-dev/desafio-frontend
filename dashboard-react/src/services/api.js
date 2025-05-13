export async function fetchBatteryData() {
  const res = await fetch("http://localhost:8080/battery");
  return await res.json();
}

export async function fetchTemperatureData() {
  const res = await fetch("http://localhost:8080/temperature");
  return await res.json();
}