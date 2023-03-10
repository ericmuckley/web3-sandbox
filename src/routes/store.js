import { writable } from "svelte/store"

export const currentUser = writable(null)
export const currentProfile = writable(null)