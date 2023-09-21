<template>
  <div id="console-window" class="bg-zinc-900/75 rounded-lg px-2 h-full">
    <output ref="outputContainer" class="text-gray-200" />
    <div id="command-line" class="flex space-x-2 text-gray-200">
      <div class="prompt mt-0.5">$&gt;</div>
      <div>
        <input ref="inputContainer" class="text-gray-200 cmdline" autofocus />
      </div>
    </div>
    <audio id="terminal-welcome" controls class="invisible absolute w-0 h-0">
      <source src="/terminal-welcome.ogg" type="audio/ogg" />
    </audio>
    <audio id="terminal-error" controls class="invisible absolute w-0 h-0">
      <source src="/terminal-error.ogg" type="audio/ogg" />
    </audio>
    <audio id="terminal-success" controls class="invisible absolute w-0 h-0">
      <source src="/terminal-success.ogg" type="audio/ogg" />
    </audio>
  </div>
</template>
<script>
  class CommandLine {
    constructor(inputContainer, outputContainer) {
      this.cmdLine_ = inputContainer
      this.output_ = outputContainer
      this.VERSION_ = '0.1'
      this.CMDS_ = ['clear', 'date', 'help', 'login', 'version']
      this.RESEARCHES_ = ['main', 'pest', 'bios', 'necro']
      this.fs_ = null
      this.cwd_ = null
      this.history_ = []
      this.histpos_ = 0
      this.histtemp_ = 0

      document.addEventListener('click', (e) => {
        this.cmdLine_.focus()
      }, false)

      this.cmdLine_.addEventListener('click', this.inputTextClick_.bind(this), false)
      this.cmdLine_.addEventListener('keydown', this.historyHandler_.bind(this), false)
      this.cmdLine_.addEventListener('keydown', this.processNewCommand_.bind(this), false)
    }

    inputTextClick_(e) {
      this.cmdLine_.value = this.cmdLine_.value
    }

    historyHandler_(e) {
      if (this.history_.length) {
        if (e.keyCode == 38 || e.keyCode == 40) {
          if (this.history_[this.histpos_]) {
            this.history_[this.histpos_] = this.cmdLine_.value
          } else {
            this.histtemp_ = this.cmdLine_.value
          }
        }
        if (e.keyCode == 38) {
          this.histpos_--

          if (this.histpos_ < 0) {
            this.histpos_ = 0
          }
        } else if (e.keyCode == 40) {
          this.histpos_++

          if (this.histpos_ > this.history_.length) {
            this.histpos_ = this.history_.length
          }
        }
        if (e.keyCode == 38 || e.keyCode == 40) {
          this.cmdLine_.value = this.history_[this.histpos_] ? this.history_[this.histpos_] : this.histtemp_
          this.cmdLine_.value = this.cmdLine_.value
        }
      }
    }

    processNewCommand_(e) {
      if (e.keyCode == 9) {
        e.preventDefault()
      } else if (e.keyCode == 13) {
        if (this.cmdLine_.value) {
          this.history_[this.history_.length] = this.cmdLine_.value
          this.histpos_ = this.history_.length
        }

        var line = this.cmdLine_.parentNode.parentNode.cloneNode(true)

        line.removeAttribute('id')
        line.classList.add('line')

        var input = line.querySelector('input.cmdline')

        input.autofocus = false
        input.readOnly = true

        this.output_.appendChild(line)

        if (this.cmdLine_.value && this.cmdLine_.value.trim()) {
          var args = this.cmdLine_.value.split(' ').filter(function (val, i) {
            return val
          })
          var cmd = args[0].toLowerCase()

          args = args.splice(1)
        }

        switch (cmd) {
          // clear
          case 'clear':
          this.output_.innerHTML = ''
          this.cmdLine_.value = ''
          this.playAudio('terminal-success')
          return

          // date
          case 'date':
          this.output(this.getCurrentDate() + '<br/><br/>')
          this.playAudio('terminal-success')
          break

          // help
          case 'help':
          this.output('<div class="ls-files">' + this.CMDS_.join('<br>') + '</div>')
          this.playAudio('terminal-success')
          break

          // research
          case 'login':
          var research = args.join(' ')
          if (!research) {
            this.output(['usage: ', cmd, ' ' + this.RESEARCHES_.join('|')].join('') + '<br/><br/>')
            this.playAudio('terminal-success')
          }
          else {
            var matchedResearches = this.RESEARCHES_.join('|').match(research)
            if (matchedResearches && matchedResearches.length) {
              this.output('error: Access denied<br/><br/>')
              this.playAudio('terminal-error')
            } else {
              this.output('error: Unrecognized command')
              this.playAudio('terminal-error')
            }
          }
          break

          // version
          case 'version':
          case 'ver':
          this.output(this.VERSION_ + '<br/><br/>')
          this.playAudio('terminal-success')
          break

          // command not found
          default:
          if (cmd) {
            this.output(cmd + ': command not found. Type "help" to list all available commands<br/><br/>')
            this.playAudio('terminal-error')
          }
        }

        window.scrollTo(0, this.getDocHeight())
        this.cmdLine_.value = ''
      }
    }

    playAudio(name) {
      var audio = document.getElementById(name)

      if (audio) {
        audio.pause()
        audio.currentTime = 0
        audio.play()
      }
    }

    output(html) {
      this.output_.insertAdjacentHTML('beforeEnd', html)
    }

    getDocHeight() {
      var d = document

      return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
      )
    }

    initFS(persistent, size) {
      this.output('╔════════════════════════════════════════════════════════╗<br/>║&nbsp;██████&nbsp;&nbsp;&nbsp;██████&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;███████&nbsp;║<br/>║&nbsp;██&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br/>║&nbsp;██████&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;█&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;█&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;█&nbsp;&nbsp;██&nbsp;███████&nbsp;║<br/>║&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;███&nbsp;██&nbsp;██&nbsp;███&nbsp;██&nbsp;██&nbsp;███&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;║<br/>║&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████&nbsp;&nbsp;&nbsp;███&nbsp;███&nbsp;&nbsp;&nbsp;███&nbsp;███&nbsp;&nbsp;&nbsp;███&nbsp;███&nbsp;&nbsp;███████&nbsp;║<br/>╠════════════════════════════════════════════════════════╣<br/>║&nbsp;LABORATORY&nbsp;TERMINAL&nbsp;&nbsp;&nbsp&nbsp;<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + this.VERSION_ + '&nbsp;║<br/>╚════════════════════════════════════════════════════════╝<br/><br/>')
      this.output('<span>' + this.getCurrentDate() + '</span><br/>')
      this.output('Type "help" to list all available commands<br/><br/>')
      this.playAudio('terminal-welcome')
    }

    getCurrentDate() {
      return (new Date()).toLocaleString()
    }
  }

  export default {
    mounted() {
      var input = this.$refs.inputContainer
      var output  = this.$refs.outputContainer

      this.cmdLine = new CommandLine(input, output)
      this.cmdLine.initFS()
    }
  }
</script>
