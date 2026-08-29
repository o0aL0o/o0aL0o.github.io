// Pre-imports every image under src/assets/images/ (which is a junction
// to public/images/) as a Vite-tracked module. Eager loading so the
// ImageMetadata objects are available synchronously at build time.

/** @type {Record<string, { default: any }>} */
const modules = import.meta.glob(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,gif,avif,JPG,JPEG}',
  { eager: true }
);

/**
 * Resolve a public-path string (e.g. "/images/cover.png") to its
 * Vite-imported module so Astro's <Image> can optimize it.
 *
 * @param {string} path  path starting with "/" or relative
 * @returns {any | undefined}  an ImageMetadata-shaped module
 */
export function publicImage(path) {
  if (!path) return undefined;
  if (typeof path !== 'string') return path;
  const stripped = path.replace(/^\//, '');
  const key = Object.keys(modules).find(
    (k) => k.endsWith('/' + stripped) || k.endsWith(stripped)
  );
  return key ? modules[key].default : undefined;
}
