const isMac = process.platform === 'darwin';

class Instance {
  tab: TabInstance | undefined;

  terminal: TerminalInstance | undefined;

  group: InstanceGroup;

  constructor(group: InstanceGroup) {
    this.group = group;

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.resetCurrentClass = this.resetCurrentClass.bind(this);
    this.setLastIndexCurrent = this.setLastIndexCurrent.bind(this);
  }

  create(label: string) {
    if (!isMac) {
      this.group.tab.ariaHidden = 'false';
    }

    this.terminal = {
      container: document.createElement('div'),
      content: document.createElement('div'),
    };

    this.terminal.container.classList.add('terminal-instance');
    this.terminal.content.classList.add('terminal-content');

    this.terminal.container.ariaLabel = label;

    this.tab = {
      container: document.createElement('div'),
      label: document.createElement('div'),
      close: document.createElement('div'),
    };

    this.tab.container.classList.add('tab');
    this.tab.label.classList.add('tab-label');
    this.tab.close.classList.add('tab-close');

    this.tab.container.ariaLabel = label;
    this.tab.label.title = label;
    this.tab.label.innerText = label;

    this.tab.container.addEventListener('click', this.onClick);
    this.tab.close.addEventListener('click', this.onClose);

    this.tab.container.appendChild(this.tab.label);
    this.tab.container.appendChild(this.tab.close);
    this.terminal.container.appendChild(this.terminal.content);

    this.group.tab.appendChild(this.tab.container);
    this.group.terminal.appendChild(this.terminal.container);

    this.setLastIndexCurrent();

    return { tab: this.tab, terminal: this.terminal.content };
  }

  onClick(event): void {
    const target = event.currentTarget;
    const index = Array.prototype.indexOf.call(this.group.tab.children, target);
    const terminalTarget = this.group.terminal.children[index];

    this.resetCurrentClass();

    target.classList.add('current');
    terminalTarget.classList.add('current');
  }

  onClose(event): void {
    const parent = event.currentTarget.parentElement;
    const index = Array.prototype.indexOf.call(this.group.tab.children, parent);
    const terminalTarget = this.group.terminal.children[index];

    parent.removeEventListener('click', this.onClick);

    if (!isMac) {
      if (this.group.tab.childElementCount === 1) {
        this.group.tab.ariaHidden = 'true';
      }
    }

    this.group.tab.removeChild(parent);
    this.group.terminal.removeChild(terminalTarget);

    if (this.group.tab.childElementCount >= 1) {
      this.setLastIndexCurrent();
    }
  }

  resetCurrentClass(): void {
    [this.group.tab, this.group.terminal].forEach(group => {
      group.childNodes.forEach(nodes => {
        const node = nodes as HTMLElement;
        node.classList.remove('current');
      });
    });
  }

  setLastIndexCurrent(): void {
    const lastTabChildren = this.group.tab.childElementCount - 1;
    const lastTermChildren = this.group.terminal.childElementCount - 1;

    this.resetCurrentClass();

    this.group.tab.children[lastTabChildren].classList.add('current');
    this.group.terminal.children[lastTermChildren].classList.add('current');
  }
}

export default Instance;
