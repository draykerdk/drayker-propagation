(() => {
  'use strict';

  const matcher = document.querySelector('[data-matcher]');

  if (matcher) {
    const plans = {
      story: {
        brief: {
          code: 'STORY / 15',
          title: 'Make a one-sentence bridge.',
          body: 'Read one public page and write a short, accurate introduction that links directly back to it. Share the source before your interpretation.',
          steps: ['Choose one primary page.', 'Write the clearest sentence you can defend.', 'Send the reader to the source.'],
          href: 'https://drayker.org/#org/docs',
          label: 'Open public documentation'
        },
        session: {
          code: 'STORY / 60',
          title: 'Draft a source-backed explainer.',
          body: 'Choose a single question a new reader may have, then make a short explainer that separates the public record from your own framing.',
          steps: ['Find the primary source and its scope.', 'Write for one real reader question.', 'Add a direct source link and invite a question.'],
          href: 'https://drayker.org/#org/docs',
          label: 'Explore documentation'
        },
        ongoing: {
          code: 'STORY / RHYTHM',
          title: 'Keep a small public reading trail.',
          body: 'Build a recurring habit of turning one verified update or page into a clear, dated pointer for your community — always leaving the original visible.',
          steps: ['Set a realistic rhythm.', 'Use one public source per share.', 'Review each message against the source before posting.'],
          href: 'https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml',
          label: 'Start a volunteer introduction'
        }
      },
      visual: {
        brief: {
          code: 'VISUAL / 15',
          title: 'Make one honest source card.',
          body: 'Pair one concise line from a public source with its URL and an unedited official mark. The goal is to make the source easier to notice, not to oversell it.',
          steps: ['Choose an official asset from the kit.', 'Use one source-supported line.', 'Place the source URL in the visual or caption.'],
          href: '#brand',
          label: 'Open the brand kit'
        },
        session: {
          code: 'VISUAL / 60',
          title: 'Create a visual explainer with receipts.',
          body: 'Turn one public concept into a simple diagram, carousel or short visual guide. Make the difference between source, proposal and interpretation readable.',
          steps: ['Read the source in full.', 'Sketch one clear flow or comparison.', 'Add links and run the brand checklist.'],
          href: 'docs/brand-guide.html',
          label: 'Read the brand guide'
        },
        ongoing: {
          code: 'VISUAL / RHYTHM',
          title: 'Maintain a reusable visual library.',
          body: 'Build a small collection of approved, source-linked visual building blocks that other volunteers can reuse without changing the mark or losing context.',
          steps: ['Organise the official asset variants.', 'Name the source behind each visual.', 'Share the reusable files through a public contribution path.'],
          href: 'https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml',
          label: 'Offer your contribution'
        }
      },
      connection: {
        brief: {
          code: 'CONNECT / 15',
          title: 'Make one warm, factual introduction.',
          body: 'Share a public link with someone who has a genuine reason to care. Explain why you are sharing it, then leave space for their own conclusion.',
          steps: ['Choose the source that fits their question.', 'Use the message starter as a draft.', 'Offer the public next step, not a promise.'],
          href: '#toolkit',
          label: 'Use message starters'
        },
        session: {
          code: 'CONNECT / 60',
          title: 'Host a source-first conversation.',
          body: 'Bring a small group around one public topic. Let the source lead, capture the questions it raises, and route unresolved points to a public forum.',
          steps: ['Choose a narrow published topic.', 'Send the link before the conversation.', 'Route questions to the public forum.'],
          href: 'https://forum.drayker.org/',
          label: 'Open the public forum'
        },
        ongoing: {
          code: 'CONNECT / RHYTHM',
          title: 'Become a reliable public handoff.',
          body: 'Help interested people move from curiosity to the appropriate public page, open function or discussion without becoming a private gatekeeper.',
          steps: ['Keep the official entry points at hand.', 'Verify a link before sharing it.', 'Offer the public volunteer route when someone is ready.'],
          href: 'https://drayker.org/#org/fn',
          label: 'Browse open functions'
        }
      },
      research: {
        brief: {
          code: 'RESEARCH / 15',
          title: 'Verify one link before it travels.',
          body: 'Check a public source, its date and its scope before you share it. A correct link is a real contribution when it prevents a vague claim from spreading.',
          steps: ['Open the primary page.', 'Check what it actually says.', 'Share the source with a precise note.'],
          href: 'https://github.com/draykerdk',
          label: 'Browse public repositories'
        },
        session: {
          code: 'RESEARCH / 60',
          title: 'Map one question to its sources.',
          body: 'Collect the minimum set of public pages someone needs to inspect a specific question. Explain how the sources relate without pretending they resolve every uncertainty.',
          steps: ['Write the question in plain language.', 'Collect primary pages only.', 'Add a short source map with dates and scope.'],
          href: 'https://drayker.org/#org/docs',
          label: 'Open public documentation'
        },
        ongoing: {
          code: 'RESEARCH / RHYTHM',
          title: 'Keep a public source watch.',
          body: 'Maintain a dated list of pages, open functions and discussions worth revisiting so your community receives context that is current, explicit and traceable.',
          steps: ['Set a sustainable review schedule.', 'Record source dates and links.', 'Share updates with scope, not speculation.'],
          href: 'https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml',
          label: 'Offer your research support'
        }
      }
    };

    let activeSkill = 'story';
    let activeWindow = 'brief';
    const title = matcher.querySelector('[data-recommendation-title]');
    const body = matcher.querySelector('[data-recommendation-body]');
    const code = matcher.querySelector('[data-recommendation-code]');
    const steps = matcher.querySelector('[data-recommendation-steps]');
    const link = matcher.querySelector('[data-recommendation-link]');

    const renderRecommendation = () => {
      const plan = plans[activeSkill][activeWindow];
      title.textContent = plan.title;
      body.textContent = plan.body;
      code.textContent = plan.code;
      link.href = plan.href;
      link.firstChild.textContent = `${plan.label} `;
      steps.replaceChildren(...plan.steps.map((step) => {
        const item = document.createElement('li');
        item.textContent = step;
        return item;
      }));
    };

    matcher.querySelectorAll('[data-skill]').forEach((button) => {
      button.addEventListener('click', () => {
        activeSkill = button.dataset.skill;
        matcher.querySelectorAll('[data-skill]').forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-selected', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
        renderRecommendation();
      });
    });

    matcher.querySelectorAll('[data-window]').forEach((button) => {
      button.addEventListener('click', () => {
        activeWindow = button.dataset.window;
        matcher.querySelectorAll('[data-window]').forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-selected', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
        renderRecommendation();
      });
    });

    renderRecommendation();
  }

  const copyStatus = document.querySelector('[data-copy-status]');
  let statusTimer;

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    if (!copied) throw new Error('Copy command unavailable');
  };

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = document.getElementById(button.dataset.copyTarget);
      if (!source) return;

      const original = button.innerHTML;
      try {
        await copyText(source.textContent.trim());
        button.textContent = 'Copied';
        if (copyStatus) copyStatus.textContent = 'Message copied. Check the source once more before sharing.';
      } catch (error) {
        if (copyStatus) copyStatus.textContent = 'Copy is unavailable here. Select the message and copy it manually.';
      }

      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(() => {
        button.innerHTML = original;
        if (copyStatus) copyStatus.textContent = '';
      }, 2600);
    });
  });

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMarkMotion = () => {
    document.querySelectorAll('[data-drayker]').forEach((element) => {
      const mark = element.__dk;
      if (!mark) return;
      if (motion.matches) mark.stop();
      else if (mark.opts.animate && !mark.ctx.ring.flat) mark.start();
    });
  };

  window.addEventListener('DOMContentLoaded', syncMarkMotion);
  motion.addEventListener('change', syncMarkMotion);
})();
