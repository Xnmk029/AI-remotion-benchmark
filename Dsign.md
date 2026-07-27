# AI Model Benchmark — Design Direction

## 1. Core direction

The project uses a restrained Swiss / International Typographic design system
for a frontier AI model benchmark video.

The visual tone should feel:

- editorial rather than cinematic;
- analytical rather than promotional;
- flat and graphic rather than three-dimensional;
- precise, calm, modern and slightly confrontational;
- suitable for presenting real benchmark footage without competing with it.

Avoid generic cyberpunk interfaces, glowing dashboards, glass panels, robots,
national flags and dense science-fiction decoration.

## 2. Visual concept

`US VS CH` is the main visual hook. It is treated as an oversized background
graphic rather than a political slogan.

The letters are custom monoline SVG paths and must not be replaced with a
condensed font. The canonical glyph geometry comes from `swissreport (1).html`:

- uniform `58px` stroke width;
- narrow, extremely tall proportions;
- equal spacing between the `US`, `VS` and `CH` groups;
- cropped vertically by the frame;
- rendered in a low-contrast paper-grey color.

The background lettering should remain quiet enough for foreground information
and benchmark footage to stay legible.

## 3. Color system

| Role | Value | Usage |
| --- | --- | --- |
| Paper | `#e9e7e0` | Main background |
| Paper deep | `#dddad1` | Oversized background lettering |
| Ink | `#101010` | Rules, labels and primary information |
| Signal red | `#f0300a` | US grouping and primary accent |
| Cobalt blue | `#1b4bc4` | CH grouping and secondary accent |

Red and blue are information anchors, not decorative gradients. Keep both colors
flat and use them sparingly.

## 4. Layout system

The composition is based on a strict editorial grid:

- oversized background wordmark;
- large central content frame;
- black abstract information bars in the upper-left area;
- one cobalt horizontal rule entering from the upper-right;
- thin registration lines, crosses, dots and measurement marks;
- a model index along the bottom before it reorganizes;
- generous empty space reserved for benchmark footage.

Lines should stay thin and mechanical. Decorative elements must support alignment
or hierarchy instead of filling empty space.

## 5. Typography

Foreground typography uses compact sans-serif and monospaced styles:

- condensed bold sans-serif for model names and large indices;
- monospaced text for metadata, issue numbers and technical labels;
- Chinese text should use a clean modern sans-serif with strong weight contrast.

Use uppercase English labels with restrained tracking. Avoid rounded UI fonts,
display scripts and oversized paragraphs.

## 6. Opening motion structure

The current opening is approximately `6.4 seconds`.

### Phase 1 — Title

- The giant `US VS CH` wordmark flashes briefly.
- The wordmark settles into the low-contrast paper background.
- The red `01 / MODEL INDEX` rail appears.
- Black bars, the blue rule, the center frame and bottom model index assemble
  rapidly on the grid.

### Phase 2 — Model grouping

- The red side rail leaves the frame.
- The bottom benchmark legend moves upward and fades.
- GPT 5.6 SOL and Claude OPUS 5 move into a left-hand US column.
- Fable 5, DeepSeek V4 GA, Kimi K3 and Qwen 3.8 MAX move into a right-hand CH
  column.
- Anonymous Kieran disappears.
- The left and right groups receive restrained red and blue section labels.

### Phase 3 — Center push

- The two-column arrangement completes before the camera movement begins.
- The camera pushes into the center frame without changing the established
  grouping.
- The red program rail remains hidden during this center-frame transition.

### Phase 4 — Program content

- After the center push, the red `01 / MODEL INDEX` rail returns as a persistent
  program identifier.
- Benchmark footage and task-specific graphics play inside the main content area.
- The rail may update its index, section name and issue information between
  chapters while preserving its structure.

## 7. Motion principles

- Prefer short, decisive movements over slow floating animation.
- Use directional wipes, position changes, scale transitions and opacity cuts.
- Elements should appear to be assembled by the underlying grid.
- Complete information reorganization before beginning a camera move.
- Keep easing firm and editorial; avoid elastic, bouncy or playful motion.
- Preserve a readable hold frame after every major transition.

## 8. Model grouping

### US column

- GPT 5.6 SOL
- Claude OPUS 5

### CH column

- Fable 5
- DeepSeek V4 GA
- Kimi K3
- Qwen 3.8 MAX 0720

### Anonymous

- Kieran appears only in the initial index and disappears during grouping.

## 9. Prototype controls

The HTML prototype provides fixed states for iteration:

- `Space`: replay the complete opening;
- `C`: title frame;
- `G`: two-column grouping frame;
- `Z`: center push frame without the program rail;
- `P`: program content frame with the persistent rail.

The working prototype is `opus_editorial_motion_prototype.html`.

