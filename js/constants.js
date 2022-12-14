// Skeleton main color
export const MAIN_COLOR = '#EEEEEE';
export const MAIN_COLOR_RGB = 'rgb(238, 238, 238)';

// Pseudo-class style
export const PSEUDO_CLASS = 'sk-pseudo';

// button style
export const BUTTON_CLASS = 'sk-button';

// Transparent style
export const TRANSPARENT_CLASS = 'sk-transparent';

// Transparent 1 pixel image
export const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// text class
export const SKELETON_TEXT_CLASS = 'skeleton-text-block-mark';

// List item Tag
export const LIST_ITEM_TAG = ['LI', 'DT', 'DD'];

export const SKELETON_DIVIDER = '<!-- SKELETON -->';
export const SKELETON_CLASS = 'skeleton-remove-after-first-request';
export const SKELETON_MAP_CLASS = 'skeleton-map-remove-after-first-request';
export const SKELETON_CONTAINER_CLASS = 'skeleton-container-remove-after-first-request';
export const SKELETON_MAP_PREFIX = `<script class="${SKELETON_CLASS} ${SKELETON_MAP_CLASS}">\nwindow.__skeletonMap = `;
export const SKELETON_MAP_SUFFIX = '</script>';

export const SKELETON_REGEXP = new RegExp(`${SKELETON_DIVIDER}([\\s\\S]*)${SKELETON_DIVIDER}`);

export const SKELETON_MAP_REGEXP = new RegExp(
  `<script class="?${SKELETON_CLASS}\\s*(?:${SKELETON_MAP_CLASS})?"?>([\\s\\S]*?window.__skeletonMap\\s*=[\\s\\S]*?)${SKELETON_MAP_SUFFIX}`,
);
